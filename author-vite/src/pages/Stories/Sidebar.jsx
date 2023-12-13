import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Sidebar({ onCategorySelect }) {
  const categories = [
    "All",
    "Fantasy",
    "Horror",
    "Comedy",
    "Romance",
    "Sci-Fi",
    "Mystery",
  ];

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#3e3e3e",
        padding: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        border: "3px solid gray",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: 2, borderBottom: "2px solid gray" }}
      >
        Categories
      </Typography>

      <List
        sx={{
          width: "100%",
        }}
      >
        {categories.map((category, index) => (
          <ListItem
            button
            key={index}
            onClick={() => onCategorySelect(category)}
            sx={{
              fontWeight: "bolder",
              width: "100%",
              textAlign: "center",
              ":hover": {
                borderTop: "2px solid gray",
                borderBottom: "2px solid gray",

                color: "black",
              },
            }}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
