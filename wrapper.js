exports.wrapper = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}
