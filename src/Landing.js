import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
function Landing() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/list");
      const payload = await response.json();
      setMovies(payload);
    }
    getData();
  }, [movies]);
  const handleClick = (e) => {
    console.log("clicked", e);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={3}>
          {movies?.map((v, k) => {
            return (
              <>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {v.title}
                      </Typography>
                      <Typography color="textSecondary">{v.tagline}</Typography>
                      <Typography variant="body2" component="p">
                        Vote Average : {v.vote_average} /10
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        to={{
                          pathname: `/${v.id}`,
                        }}
                      >
                        <Button size="small">Get More Information</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>
      </header>
    </div>
  );
}

export default Landing;
