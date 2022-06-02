export const nuevoUsuario = async (req, res) => {
  res.json({ ok: true, msg: 'new' });
};

export const login = async (req, res) => {
  res.json({ ok: true, msg: 'login' });
};

export const renewToken = async (req, res) => {
  res.json({ ok: true, msg: 'renew' });
};
