'user strict';
const router = require('express').Router();
const { handleError } = require('../middleware/error');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const DeviceController = require('../controllers/device');
const ZoneController = require('../controllers/zone');
const joiMiddleware = require('../middleware/joi');

module.exports = () => {
    router.use(multer().none());
    router
        .route('/get-device-user-and-type')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.getDeviceByUserAndType,
            handleError
        );
    router
        .route('/get-device-user')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.getDeviceUser,
            handleError
        );
    router
        .route('/get-device')
        .get(
            joiMiddleware.joiDevice,
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.getDeviceByID,
            handleError
        );
    router
        .route('/link-device')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.linkDeviceToUser,
            handleError
        );
    router
        .route('/unlink-device')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.unLinkDevice,
            handleError
        );
    router
        .route('/unlink-all-device')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            DeviceController.unLinkAllDevice,
            handleError
        );
    // _____________________________________________________________
    router
        .route('/new-zone')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            ZoneController.newZone,
            handleError
        );
    router
        .route('/zone/insert-device')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            ZoneController.insertDevice,
            handleError
        );
    router
        .route('/zone/insert-many')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            ZoneController.insertManyDevice,
            handleError
        );
    router
        .route('/zone/remove-device')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            ZoneController.removeDevice,
            handleError
        );
    router
        .route('/zone/remove-many')
        .get(
            authMiddleware.isAuth,
            authMiddleware.isActive,
            ZoneController.removeManyDevices,
            handleError
        );
    //FIXME: add role admin auth
    router
        .route('/admin/get-all-device')
        .get(DeviceController.getAllDevice, handleError);
    router
        .route('/admin/get-device-same-type')
        .get(DeviceController.getAllDeviceSameType, handleError);

    return router;
};