# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




 const { token } = req.params
    const { id, password, confirmPassword } = req.body

    if (!password || !confirmPassword) {
      return next(errorHandler(400, 'Please fill in all fields'))
    }

    if (password !== confirmPassword) {
      return next(errorHandler(400, 'Passwords do not match'))
    }

    try {
      const user = await User.findById(id)
      if (!user) return next(errorHandler(404, 'User not found!'))

      if (user.resetToken !== token) {
        return next(errorHandler(400, 'Invalid or expired reset token'))
      }

      if (user.resetTokenExpiry < Date.now()) {
        return next(errorHandler(400, 'Invalid or expired reset token'))
      }

      const hashedPassword = bcryptjs.hashSync(password, 10)
      user.password = hashedPassword
      user.resetToken = ''
      user.resetTokenExpiry = null
      await user.save()

      res.status(200).json('Password reset successfully!')
    } catch (error) {
      next(error)
    }