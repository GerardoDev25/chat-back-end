import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({
  nombre: { type: String, required: true },
  emal: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  online: { type: Boolean, default: false },
});

UsuarioSchema.method('toJSON', function () {
  const { __v, id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default model('usuario', UsuarioSchema);
