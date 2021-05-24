import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Grid, Container, Grow, Paper, AppBar, TextField, Button} from '@material-ui/core';
import {useHistory,useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts'
import Form from '../Forms/Form';
import Pagination from  '../Pagination';
import {getPost,getPostBySearch} from '../../state/Posts/actionCreators';
import useStyles from './style';


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [curId, setCurId] = useState(null);
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search,setSearch] = useState('');
    const [tags, setTags] = useState([]);

    // useEffect(()=>{
    //     dispatch(getPost());
    //   },[dispatch])


    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        searchPost();
      }
    }

    const handleAddTags = (tag) => {
      setTags([...tags, tag])
    }

    const handleDeleteTag = (tagToDelete) => {
      setTags(tags.filter(tag => tag !== tagToDelete));
    } 

    const searchPost = () => {
      if(search.trim() || tags){
        dispatch(getPostBySearch({search,tags:tags.join(',')}));
        history.push(`/posts/search?searchQuery=${search||'none'}&tag=${tags.join(',')}`)
      }else{
        history.push('/');
      }
      
    }
    return (
        <Grow in>
        <Container maxWidth="xl">
          <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.GridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurId={setCurId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField 
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value);}}
                  onKeyPress={handleKeyPress}
                />
                <ChipInput 
                  style={{margin:'10px 0'}}
                  value={tags}
                  onAdd={(tag) => handleAddTags(tag)}
                  onDelete={(tag) => handleDeleteTag(tag)}
                  label="Search Tags"
                  variant="outlined"    
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search Post</Button>
              </AppBar>
              <Form curId={curId} setCurId={setCurId}/>
              
              {(!searchQuery && !tags.length) &&  // right now pagination is simple and only work on default ordering 
                <Paper elevation={6} className={classes.pagination}>
                  <Pagination page={page}/>
                </Paper>
              }
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home;