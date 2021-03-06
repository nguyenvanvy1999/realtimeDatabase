const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const deviceSchema = new Schema({
    _id: ObjectId,
    user: { type: ObjectId, ref: 'User', default: null },
    deviceID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
    info: { type: Schema.Types.Mixed },
    type: { type: Schema.Types.Mixed },
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;