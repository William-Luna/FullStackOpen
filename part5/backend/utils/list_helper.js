const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((accumulator, blog) => {
      return accumulator + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((mostLiked, curr) => {
      return mostLiked.likes < curr.likes
        ? curr
        : mostLiked
    })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  const authorBlogCount = blogs.reduce((accumulator, curr) => {
    return accumulator[curr.author]
      ? ++accumulator[curr.author]
      : accumulator[curr.author] = 1, accumulator
  }, {})
  const author = Object.keys(authorBlogCount).reduce((acc, curr) => authorBlogCount[acc] < authorBlogCount[curr] ? curr : acc)
  return { author, blogs: authorBlogCount[author] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  const authorLikesCount = blogs.reduce((accumulator, curr) => {
    return accumulator[curr.author]
      ? accumulator[curr.author] += curr.likes
      : accumulator[curr.author] = curr.likes, accumulator
  }, {})
  const author = Object.keys(authorLikesCount).reduce((acc, curr) => authorLikesCount[acc] < authorLikesCount[curr] ? curr : acc)
  return { author, likes: authorLikesCount[author] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}