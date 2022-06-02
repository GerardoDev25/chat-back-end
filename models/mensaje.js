import { Schema, model, SchemaTypes } from 'mongoose';

const MensajeSchema = Schema(
  {
    de: { type: SchemaTypes.ObjectId, ref: 'Usuario', required: true },
    para: { type: SchemaTypes.ObjectId, ref: 'Usuario', required: true },
    mensaje: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

MensajeSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

export default model('usuario', MensajeSchema);
