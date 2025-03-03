import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const loggedUser = await User.findById(userId)
        AccessToken = loggedUser.generateAccessToken()
        RefreshToken = loggedUser.generateRefreshToken()


        loggedUser.refreshToken = RefreshToken;
        await loggedUser.save({ validateBeforeSave: false })


        return { AccessToken, RefreshToken }

    } catch (error) {
        return res.status(500).json({
            success: false,
            messahe: "something went wrong"
        })

    }
}


const registerUser = async (req, res) => {


    try {
        const { username, email, password } = req.body
        if (username === "") {
            res.status(400).json({
                success: false,
                message: "username is required "
            })

        }
        if (email === "") {
            res.status(400).json({
                success: false,
                message: "email is required"
            })

        }
        if (password === "") {
            res.status(400).json({
                success: false,
                message: "password is required"
            })

        }

        const existedUser = await User.findOne(
            { $or: [{ username }, { email }] }
        )

        if (existedUser) {

            res.status(200).json({
                message: "user already existed with this email and name"
            })

        }
        const avatarLocalPath = req.files?.avatar?.[0]?.path;

        if (!avatarLocalPath) {
            res.status().json({
                message: "no avatar file "
            })
        }

        const avatar = uploadOnCloudinary(avatarLocalPath)

        const user = await User.create({
            username,
            email,
            password,
            avatar: avatar.url
        })

        const createdUser = User.findById(user._id).select(
            "-password -refreshTokens"
        )

        if (!createdUser)
            res.status(500).json({
                message: "something went wrong while registering"
            })

        return res.status(200).json({
            createdUser,
            message: "user registerd success"
        })
    } catch (error) {
        console.log("error during registration");

        return res.status(500).json({
            success: false,
            message: "internal server error"
        })

    }


}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === "") {
            return res.status(400).json({
                success: false,
                message: "email is required "
            })
        }
        if (password === "") {
            return res.status(400).json({
                success: false,
                message: "fill the password"
            })
        }

        const loggedUser = await User.findOne({
            $or: [{ email }]
        })
        if (!loggedUser) {
            return res.status(404).json({
                success: false,
                message: "please register"
            })
        }

        const ispasswordValid = await loggedUser.isPasswordcorrect(password)

        if (!ispasswordValid) {
            return res.status(401).json({
                success: false,
                message: "invalid credential"
            })
        }

        const { AccessToken, RefreshToken } = await generateAccessAndRefreshTokens(loggedUser._id)


        const loggedInUser = await User.findById(loggedUser._id).select("-password -refreshToken")


        const option = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie("accessToken", AccessToken)
            .cookie("refreshToken", RefreshToken)
            .json({
                loggedInUser,
                AccessToken,
                RefreshToken,
                message: "user Logged in successfully"

            })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "something went wrong "
        })

    }
}
const logoutUser = async (req, res) => {

    User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshTokens: undefined
        }
    }, {
        new: true
    })
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json({
            success: true,
            message: "user logged out "

        })
}


export {
    registerUser,
    loginUser,
    logoutUser
}
