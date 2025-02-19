import { ChatIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import API from '../api';
import { useAuth0 } from '@auth0/auth0-react';
import MovieShowCard from './MovieShowCard';
import { PlusCircleIcon, StarIcon } from '@heroicons/react/outline';
import useWatchList from '../hooks/useWatchList';


const Status = ({ post, addComment }) => {
	const { getAccessTokenSilently } = useAuth0();
	const [commentArea, setCommentArea] = useState(false);
	const [commentContent, setCommentContent] = useState('');
	const [visibleComment, setVisibleComment] = useState(post?.comments);
	const [media, setMedia] = useState({});
	const [fromStatus, setFromStatus] = useState(true)
	const [hoveredId, setHoveredId] = useState(null);
	const { addToWatchList } = useWatchList();

	let commentVisibility = false;

	const getMedia = async () => {
		const api = new API();
		const res = await api.getMediaDetails(post.mediaId);
		setMedia(res);
	}

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		addComment(post._id, commentContent);
		setCommentContent('');
	}

	const _addToWatchList = async (title, type, mediaId) => {
		await addToWatchList(title, type, mediaId);
		alert('Movie added to watchlist');
	}

	useEffect(() => {
		const commentModification = () => {
			if (post.comments) {
				if (post.comments.length > 2) {
					setVisibleComment(post.comments?.slice(0, 2))
				} else {
					setVisibleComment(post?.comments)
				}
			}
		}

		commentModification();
		// eslint-disable-next-line
	}, [post.comments]);

	useEffect(() => {
		getMedia();
		// eslint-disable-next-line
	}, []);


	if (post.comments && post.comments.length !== 0) {
		commentVisibility = true
	}

	// TODO: The comment handling logic needs improvement. It should be more simpler
	const showAllComment = async () => {
		const token = await getAccessTokenSilently();
		const api = new API(token);
		const res = await api.getPostComments(post._id);
		setVisibleComment(res.comments);
	}

	const makeComment = () => {
		setCommentArea(!commentArea)
	}

	const handleMouseIn = (id) => {
		setHoveredId(id);
	}

	const handleMouseOut = () => {
		setHoveredId(null);
	}

	return (
		<div>
			<div className="mt-3 flex flex-col">
				<div className="bg-white mt-3 border rounded-t-lg shadow-lg">
					<div className="bg-white w-full shadow-lg border-2 border-gray-100 rounded-lg p-5">
						<div className="flex items-center">
							<Link to={`/user/${post.author._id}`} className='hover:bg-gray-100 p-2 items-center flex rounded justify-center'>
								<img className="h-10 w-10 rounded-full"
									src={post?.author?.avatarUrl}
									alt=""
								/>
							</Link>
							<div>
								<Link to={`/user/${post.author._id}`} className='flex items-center justify-between w-full py-2 rounded ml-4'>
									<h4 className="text-lg text-gray-700 hover:underline">{post.author.name}</h4>
								</Link>
								<p className="text-sm mt-1 text-gray-400">{post.postDate}</p>
							</div>
						</div>
						<div>
							{post.type === 'watch' ? <p className='text-md text-gray-600 mt-2 mb-2'>Is Watching...</p> :
								<p className='text-md text-gray-600 mt-2 mb-2'>Posted a Review on</p>}

							<div className="flex relative shadow-md" onMouseEnter={() => handleMouseIn(media.id)} onMouseLeave={() => handleMouseOut()}>
								<Link to={`/movie/${media.id}`} className="bg-white p-1 rounded-md inline-flex justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<MovieShowCard show={media} fromStatus={fromStatus} />
								</Link>

								{hoveredId && hoveredId === media.id ?
									<div className="has-tooltip">
										<span className="tooltip rounded shadow-lg bg-white-100 text-xs mt-8 text-center -ml-10">Add To Watch List</span>
										<button className="flex absolute right-2 top-2 justify-start rounded-md text-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
											onClick={() => _addToWatchList(media.title, 'movie', media.id)}
										>

											<PlusCircleIcon className='h-6 w-6 text-gray-400' />
										</button>
									</div>
									: null
								}
							</div>

							{post.rating ?
								<p className='text-sm mt-3 flex items-center'>
									Rating: {post.rating}<StarIcon className="h-4 w-4 text-yellow-500" />
								</p> :
								''
							}

							<p className='text-md text-gray-600 mt-1 mb-2'>{post.content}</p>

						</div>

						<div className='flex justify-center'>
							<div className="bg-white w-full mb-4 mt-2 flex flex-row flex-wrap justify-center">
								<button className="w-full p-2 hover:bg-gray-100 hover:text-gray-800 flex justify-center rounded-md items-center text-xl text-gray-500 font-semibold" onClick={makeComment}>
									<ChatIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
						</div>

						{commentArea ?
							<div className="rounded-lg bg-gray-50 mb-2 shadow">
								<form action="#" method="post">
									<textarea className="bg-gray-100 w-full rounded-t-lg border" rows="3" placeholder="What are your thoughts? " value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea>
									<div className="text-center pb-2">
										<button
											type="submit"
											onClick={handleCommentSubmit}
											className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											Comment
										</button>
									</div>
								</form>
							</div> : ''}

						{commentVisibility ?
							<div className="w-full">
								<Comments comments={visibleComment} />
								<button className="text-xs mt-2 text-gray-400 hover:underline hover:text-gray-500" onClick={showAllComment}>View All Comments ({post.totalComments[0].count})</button>
							</div>
							: <p className="text-xs mt-2 text-gray-400">Wow Such Empty. Be the first to comment</p>}
						{/* <div className="bg-white border-4 bg-gray-300 border-white rounded-b-lg shadow p-5 text-xl text-gray-700 content-center font-semibold flex flex-row flex-wrap">
						<div className="w-full">
							<div className="w-full text-left text-xl text-gray-600">
								@Some Person
							</div>
							A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
							A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
						</div>
					</div>
					: <p className="mt-2 text-center text-gray-400 items-center">Wow Such Empty</p> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Status
