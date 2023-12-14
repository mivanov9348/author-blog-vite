import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
} from "@mui/material";

const categories = ["Technology", "Design", "Culture", "Business", "Travel"];

export default function BlogSidebar() {
  return (
    <Paper
      sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "10px" }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        About Me
      </Typography>
      <Typography variant="body1">
        Hi, I'm [Your Name], a passionate blogger about [Your Blog Topics].
        Welcome to my blog!
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Categories
      </Typography>
      <List>
        {categories.map((category, index) => (
          <ListItem key={index}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Follow Me
      </Typography>
      <Typography variant="body1">
        <Link href="#" sx={{ mr: 2 }}>
          LinkedIn
        </Link>
        <Link href="#" sx={{ mr: 2 }}>
          Twitter
        </Link>
        <Link href="#">Instagram</Link>
      </Typography>
    </Paper>
  );
}
