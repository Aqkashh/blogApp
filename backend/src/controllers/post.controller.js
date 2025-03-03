
import { Post } from "../models/posts.models.js"
import { User } from "../models/user.models.js"
const CreatePost = async (req, res, next) => {
    try {
        const { title, content } = req.body
        if (title === "") {
            return res.status(400).json({
                success: false,
                message: "title is required "
            })
        }
        if (content === "") {
            return res.status(400).json({
                success: false,
                message: "content is required "
            })
        }

        const post = await Post.create({
            title,
            content,
            authorId: req.user._id
        })

        return res.status(200).json({
            post,
            success:true,
            message:"post created"
        })

    }

catch (error) {
    return res(500).json({
        success:false,
        message:"something went wrong while creating the post "
    })

}
}



