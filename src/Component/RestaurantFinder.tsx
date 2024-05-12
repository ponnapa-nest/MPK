import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  Pagination,
} from "@mui/material";
import { Notifications, Search as SearchIcon } from "@mui/icons-material";
import { makeStyles, createStyles } from "@mui/styles";

const center = {
  lat: 13.779820829768585,
  lng: 100.54464812602707,
};

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: "400px",
      height: "225px",
      margin: "10px", // Adjust margin as needed
    },
  })
);

const RestaurantFinder: React.FC = () => {
  const [restaurantType, setRestaurantType] = useState<string>("restaurant");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1); // Current page number
  const [totalPages, setTotalPages] = useState<number>(1); // Total number of pages

  const fetchRestaurants = (type: string, keyword: string) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: center,
      radius: 5000, // 5 kilometers radius
      type: type,
      keyword: keyword,
    };

    service.nearbySearch(request, (results: any, status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setRestaurants(results);
        const totalResults = Math.ceil(results.length / 9);
        setTotalPages(totalResults);
        console.log(totalResults);
        
      }
    });
  };

  useEffect(() => {
    fetchRestaurants(restaurantType, searchKeyword);
  }, [restaurantType, searchKeyword]);

  const classes = useStyles();

  // Function to get the current page's restaurants
  const getCurrentPageRestaurants = () => {
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    return restaurants.slice(startIndex, endIndex);
  };

  return (
    <div style={{ marginLeft: "90px" }}>
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          margin: "30px"
        }}
      >
        <Select
          value={restaurantType}
          onChange={(e) => setRestaurantType(e.target.value)}
          sx={{ border: "1px solid #134B8A", borderRadius: "50px" }}
        >
          <MenuItem value={"restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"bakery"}>Bakery</MenuItem>
          <MenuItem value={"cafe"}>Cafe</MenuItem>
        </Select>
        <TextField
          type="text"
          placeholder="Search name..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          InputProps={{
            sx: { border: "1px solid #134B8A", borderRadius: "50px" },
            endAdornment: (
              <IconButton>
                <SearchIcon
                  onClick={() =>
                    fetchRestaurants(restaurantType, searchKeyword)
                  }
                />
              </IconButton>
            ),
          }}
        />
      </div>
      <Grid container justifyContent="center">
        {getCurrentPageRestaurants().map((restaurant, index) => (
          <Grid item key={index}>
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ marginBottom: "10px" }}
                >
                  <Grid item>
                    <CardMedia
                      component="img"
                      height="50"
                      sx={{ width: "50px !important", borderRadius: "10px" }}
                      image={restaurant.icon}
                      alt={`Restaurant photo ${index}`}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{
                        maxWidth: 292,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip title={restaurant.name}>
                        {restaurant.name}
                      </Tooltip>
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Opening hours:
                        {restaurant.opening_hours?.periods?.map(
                          (period: any, idx: number) => (
                            <span key={idx}>
                              {period.open && period.close
                                ? `${period.open.time} - ${period.close.time}`
                                : "Closed"}
                              <br />
                            </span>
                          )
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ marginLeft: "auto" }}
                      >
                        Rating: {restaurant.rating}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {restaurant.photos
                    ?.slice(0, 3)
                    .map((photo: any, index: number) => (
                      <Grid item key={index}>
                        <CardMedia
                          component="img"
                          height="120"
                          sx={{
                            width: "120px !important",
                            borderRadius:
                              index === 0 ? "10px 0px 0px 10px" : "0px",
                            borderBottomRightRadius:
                              index === 2 ? "10px" : "0px",
                            borderTopRightRadius: index === 2 ? "10px" : "0px",
                          }}
                          image={photo.getUrl()}
                          alt={`Restaurant photo ${index}`}
                        />
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Pagination
            count={totalPages}
            variant="outlined"
            color="primary"
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantFinder;
