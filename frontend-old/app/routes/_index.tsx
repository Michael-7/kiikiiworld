import Nav from "~/components/nav/nav";
import Home from "~/components/home/home";
import Menu from "~/components/menu/menu";

export function getStaticPaths() {
  return ["/"];
}

export default function Index() {
  return (
    <>
      <Nav></Nav>
      <Menu></Menu>
      <Home></Home>
    </>
  );
}
