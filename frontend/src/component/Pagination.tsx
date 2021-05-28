import React,{useEffect} from 'react';
import {Pagination,PaginationItem} from '@material-ui/lab';
import {Link} from 'react-router-dom';
import useStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../state/Posts/actionCreators';
import {RootState} from '../state/index';

interface PaginateProps{
    page:number|null;
}

const Paginate = ({page}:PaginateProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {numberOfPages} = useSelector((state:RootState) => state.posts);
    useEffect(() => {
        if(page){
            dispatch(getPosts(page));
        }
    },[page]);
    return (
        <Pagination 
            classes={{ul:classes.ul}}
            count={numberOfPages || 1}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item)=>( <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/> )}
        />
    );
};


export default Paginate;