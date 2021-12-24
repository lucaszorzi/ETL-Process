export const start = () => {
    init()
      .then(app => {
        app.listen(port, () => {
          let server =
            (env === "secure" ? "https://" : "http://") + host + ":" + port;
          console.log(
            chalk.green("Development server started on port " + server)
          );
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  module.exports = start();