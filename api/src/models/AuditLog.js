import mongoose from 'mongoose';
const auditSchema = new mongoose.Schema({ type: String, payload: Object, actorTelegramId: Number }, { timestamps: true });
export default mongoose.model('AuditLog', auditSchema);
