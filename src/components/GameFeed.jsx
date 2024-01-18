import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap"
import { getAllGames } from "../services/game-service";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import Game from "./Game";

const GameFeed = () => {

    ///
    const [gameContent, setGameContent] = useState({
        content:[],
        totalPage:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
    })

    ///current page
    const [currPage, setCurrPage] = useState(0)
    
    //Infinite Scroll
    const changePageInfinite = () => {
        setCurrPage(currPage + 1);
    }

    ///Change page
    const changePage = (pageNumber = 0, pageSize = 5) => {

        ///load all games
        getAllGames(pageNumber, pageSize).then((data) => {

            //
            setGameContent({
                content         :[...data.content],
                totalPage       :data.totalPage,
                totalElements   :data.totalElements,
                pageSize        :data.pageSize,
                lastPage        :data.lastPage,
                pageNumber      :data.pageNumber
            });
        }).catch((error) => {
            toast.error("Error in loading Games !!");
            console.log(error);
        })

    }

    ///run when page loads first time or any change occur in currPage
    useEffect(() => {
        
        //get all post
        changePage(currPage);
        console.log(gameContent);
    }, [currPage])

    return(
        <div className="container-fluid">

            <Row>
                <Col>
                    {/* Number of total games */}
                    <h1>Games ({gameContent?.totalElements})</h1>

                    {/* Infinite Scroll */}
                    <InfiniteScroll
                    dataLength={gameContent.content.length}
                        next={changePageInfinite}
                        hasMore={!gameContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign:'center'}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {/* Show Games */}
                        {
                            gameContent.content.map((game) => (
                                <Game game={game} key={game.gameId} />
                            ))
                        }

                    </InfiniteScroll>
                </Col>
            </Row>

        </div>
    )
}

export default GameFeed;