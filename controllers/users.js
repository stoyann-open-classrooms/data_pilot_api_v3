const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const User = require('../models/User')
const sendEmail = require('../utils/sendEmail')

// @desc      Get all users
// @route     GET /api/v3/auth/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc      Get single user
// @route     GET /api/v3/auth/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Create user
// @route     POST /api/v3/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  const message = `Un compte utilisateur sur Data pilot a éte créer! Vous pouvez désormais vous connecter à votre espace client sur le site www.data-pilot.nc 
  avec les identifiants suivants : email : ${req.body.email} password: ${req.body.password}. N'oubliez pas de changer votre mot de passe.`

  try {
    await sendEmail({
      email: user.email,
      subject: `Création de votre compte ${req.body.role} Krysto`,
      message,
    })
    res.status(201).json({ success: true, data: user })
  } catch (err) {
    console.log(err)
    return next(new ErrorResponse('Email could not be sent', 500))
  }
})

// @desc      Update user
// @route     PUT /api/v3/auth/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc      Delete user
// @route     DELETE /api/v3/auth/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc      Get current logged in user
// @route     POST /api/v3/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('permissions')

  res.status(200).json({
    success: true,
    data: user,
  })
})
