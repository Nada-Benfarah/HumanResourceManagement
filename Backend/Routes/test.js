const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "_" + Math.round(Math.random() * 1e9) + ".pdf";
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/i)) {
      return cb(new Error("Please upload an pdf file"));
    }
    cb(null, true);
  },
}).single("pdf_file");

router.post(
  "/",
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        res.json({ err });
      } else {
        next();
      }
    });
  },
  (req, res) => {
    const reponse = {
      from: req.body.from,
      demande: req.body.demande,
      response: req.body.response,
      evaluation: req.body.evaluation ? req.body.evaluation : null,
    };
    if (req.file !== undefined) {
      reponse.pdf_file = req.file.path;
    } else {
      reponse.pdf_file = null;
    }
    queries
      .addReponse(reponse)
      .then((ids) => {
        id = ids[0];
        queries
          .getReponse(id)
          .then((addedResponse) => {
            res.json(addedResponse);

            getMailInfo(addedResponse.from, addedResponse.demande)
              .then((resp) => {
                const { from, demande, employee } = resp;

                if (employee.email) {
                  sendMail(
                    employee.email,
                    "Réponse à votre demande",
                    `
  votre demande : (${JSON.stringify(demande)})
  ${addedResponse.response} par ${from.login}(${from.fname} ${from.lname})
                `
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => res.json({ err }));
      })
      .catch((err) => res.json({ err }));
  }
);
