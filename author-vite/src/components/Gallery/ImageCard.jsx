import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function ImageCard({ imagesrc }) {
  return (
    <Card sx={{ maxWidth: 350, m: 2 }}>
      <CardMedia component="img" image={imagesrc} height="260" alt="img" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Descr
        </Typography>
      </CardContent>
    </Card>
  );
}
