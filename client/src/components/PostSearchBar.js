import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from 'react-click-outside-hook'
import MoonLoader from 'react-spinners/MoonLoader'
import axios from 'axios'
import { useDebounce } from '../hooks/debounceHook'
import { Link } from 'react-router-dom'
import MovieShow from './MovieShow'
import { SearchIcon } from '@heroicons/react/outline'
import MovieShowCard from './MovieShowCard'
import { PlusCircleIcon } from '@heroicons/react/outline'

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 20rem;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  @media (max-width: 1190px) {
	width: 15rem;
  }
`;


const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
	expanded: {
		height: "30em",
		position: 'absolute',
		top: -20
	},
	collapsed: {
		height: "2.7em",
		position: 'absolute',
		top: -20
	},
}


const PostSearchBar = ({ keyword, selectHandler, fromPost }) => {

	const key = process.env.REACT_APP_TMDB_KEY

	const [isExpanded, setExpanded] = useState(false)
	const [parentRef, isClickedOutside] = useClickOutside()
	const inputRef = useRef()
	const [searchQuery, setSearchQuery] = useState("")
	const [isLoading, setLoading] = useState(false)
	const [tvShows, setTvShows] = useState([])
	const [noTvShows, setNoTvShows] = useState(false)
	const [hoveredId, setHoveredId] = useState(null);

	const fromSearch = useState(true)

	const isEmpty = !tvShows || tvShows.length === 0

	const changeHandler = (e) => {
		e.preventDefault()
		if (e.target.value.trim() === "") setNoTvShows(false)

		setSearchQuery(e.target.value)
	}

	const expandContainer = () => {
		setExpanded(true)
	}

	const collapseContainer = () => {
		setExpanded(false)
		setSearchQuery("")
		setLoading(false)
		setNoTvShows(false)
		setTvShows([])
		if (inputRef.current) inputRef.current.value = ""
	}

	useEffect(() => {
		if (isClickedOutside) collapseContainer()
	}, [isClickedOutside])

	const prepareSearchQuery = (query) => {
		const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`

		return encodeURI(url)
	}

	const searchTvShow = async () => {
		if (!searchQuery || searchQuery.trim() === "") return

		setLoading(true)
		setNoTvShows(false)

		const URL = prepareSearchQuery(searchQuery)

		const response = await axios.get(URL).catch((err) => {
			console.log("Error: ", err)
		})

		const responseList = response.data

		if (response) {
			if (responseList && responseList.length === 0) setNoTvShows(true)

			setTvShows(responseList.results)
		}

		setLoading(false)
	}

	const handleMouseIn = (id) => {
		setHoveredId(id);
	}

	const handleMouseOut = () => {
		setHoveredId(null);
	}

	const addToWatchList = () => {
		// TODO: The logic for adding to watchlist
	}

	useDebounce(searchQuery, 500, searchTvShow)


	return (
		<div style={{ display: 'relative' }}>
			<SearchBarContainer
				animate={isExpanded ? "expanded" : "collapsed"}
				variants={containerVariants}
				ref={parentRef}
				className="border-2 border-gray-300"
			>
				<div className="relative mx-auto z-0 text-gray-600 flex items-center">
					<SearchIcon className="p-2 items-center text-center h-10 w-10" aria-hidden="true" />
					<input className="w-full pr-24 rounded-md text-sm focus:outline-none hover:border-gray-600"
						placeholder="Search" onFocus={expandContainer} ref={inputRef} value={searchQuery} onChange={changeHandler} />

					<AnimatePresence>
						{isExpanded && (
							<CloseIcon
								key="close-icon"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={collapseContainer}
								transition={{ duration: 0.2 }}
							>
								<IoClose />
							</CloseIcon>
						)}
					</AnimatePresence>
				</div>


				{isExpanded && <LineSeperator />}
				{isExpanded && (
					<div className="overflow-y-auto">
						{isLoading && (
							<LoadingWrapper>
								<MoonLoader loading color="#000" size={20} />
							</LoadingWrapper>
						)}
						{!isLoading && noTvShows && (
							<LoadingWrapper>
								<WarningMessage>No Tv Shows or Series found!</WarningMessage>
							</LoadingWrapper>
						)}
						{!isLoading && !isEmpty && (
							<>{
								!fromPost ?
									<>
										{tvShows.map(show => (
											<div className='flex relative' key={show.id} onMouseEnter={() => handleMouseIn(show.id)} onMouseLeave={() => handleMouseOut()}>
												<Link to={`/movie/${show.id}`} className="bg-white p-1 rounded-md inline-flex justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
													<MovieShowCard fromSearch={fromSearch} show={show} />
												</Link>
												{hoveredId && hoveredId === show.id ?
													<button className="flex absolute right-0 top-0 justify-start has-tooltip rounded-md p-2 text-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
														onClick={addToWatchList(show.id)}
													>
														<span className="tooltip  rounded shadow-lg bg-white-100 text-xs mt-8 -ml-4">Add To Watch List</span>
														<PlusCircleIcon className='h-6 w-6 text-gray-400' />
													</button> : null
												}

											</div>

										))}
									</>
									:
									<>
										{tvShows.map(show => (
											<MovieShow fromSearch={fromSearch} selectHandler={selectHandler} show={show} key={show.id} />
										))}
									</>
							}
							</>
						)}
					</div>
				)}

			</SearchBarContainer>
		</div>
	)
}

export default PostSearchBar
