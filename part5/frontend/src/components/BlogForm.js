import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = event => {
        event.preventDefault();

        createBlog({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Create New Blog</h3>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
                </div><div>
                    Author:
                    <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
                </div><div>
                    URL:
                    <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm