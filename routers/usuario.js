const {Router} = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/usuarios');
const { existeEmail, esRolValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/', usuarioGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], usuarioPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El nombre debe ser mas de 6 letras').isLength({min: 6}),
   // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido),
    check('correo').custom(existeEmail),
    check('correo', 'El correo no es valido').isEmail(),
    validarCampos

], usuarioPost);

router.delete('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    validarCampos
    
], usuarioDelete);

module.exports = router;