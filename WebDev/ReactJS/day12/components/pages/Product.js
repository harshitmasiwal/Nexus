import { Link, Outlet } from "react-router";

export default function Product() {
  return (
    <>
      <h1>This is Product page</h1>

      <ul className="navbar-links">
        <Link to="">All products</Link>
        <Link to="pid1">see Product 1</Link>
        <Link to="pid2">see Product 2</Link>
      </ul>

      
      <Outlet></Outlet>
    </>
  );
}
