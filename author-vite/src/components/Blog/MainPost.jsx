import React from "react";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";

export default function MainPost({ post }) {
  const sanitizedSummary = DOMPurify.sanitize(post.summary);

  return (
    <Box
      component={NavLink}
      to={`/blog/${post._id}`}
      sx={{
        width: "100%",
        overflow: "hidden",
        border: "2px solid black",
        borderRadius: "10px",
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "inherit",
        "&:hover": {
          boxShadow: "1px 1px 5px 5px rgba(241, 241, 241, 0.2)",
        },
        display: "block",
      }}
    >
      <img
        style={{
          width: "100%",
          height: 350,
          objectFit: "cover",
          border: "2px solid black",
          borderRadius: "10px",
        }}
        alt={post.title}
        src={`http://localhost:3000${post.image}`}
      />

      <Box sx={{ padding: 2, color: "white" }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {post.date}
        </Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: sanitizedSummary }}
        />
      </Box>
    </Box>
  );
}
