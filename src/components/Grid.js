import { Box, Typography } from "@mui/material";
import "../styles/Grid.css";

export function Grid() {
  const data = [
    { name: "Lauren", age: "43" },
    { name: "Myke", age: "46" },
    { name: "Jeremiah", age: "17" },
    { name: "Isaiah", age: "16" },
    { name: "Malachi", age: "10" },
  ];

  return (
    <Box className="grid-container">
      {/* <Box className="itemContainer"> */}
      {data &&
        data.map((item) => (
          <div className="itemContainer">
            <div className="textContent">
              <Typography variant="h2">{item.name}</Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {item.age}
              </Typography>
            </div>
            <div className="cardEnd">
              <Box
                component="div"
                className="pipe"
                sx={{ width: 5, height: 150, backgroundColor: "#000" }}
              />
            </div>
          </div>
        ))}
      {/* </Box>  */}
    </Box>
  );
}
