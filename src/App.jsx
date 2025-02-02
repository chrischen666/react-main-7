import { useState } from "react";
import axios from "axios";
import LoginPage from "./page/LoginPage";
import ProductPage from "./page/ProductPage";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;
function App() {
  //產品陣列
  const [products, setProducts] = useState([]);
  //登入狀態
  const [isAuth, setIsAuth] = useState(false);
  //設定分頁狀態
  const [pageInfo, setPageInfo] = useState({});
  //取得產品資料&取得分頁資料
  const getProducts = async (page = 1) => {
    try {
      const productData = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      const { products } = productData.data;
      const { pagination } = productData.data;
      setPageInfo(pagination);
      setProducts(products);
    } catch (error) {
      alert(error, "取得產品資料失敗");
    }
  };

  return (
    <>
      {isAuth ? (
        <ProductPage getProducts={getProducts}  pageInfo={pageInfo}  products={products} />
      ) : (
        <LoginPage getProducts={getProducts} setIsAuth={setIsAuth}/>
      )}
    </>
  );
}
export default App;
