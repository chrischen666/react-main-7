import { useRef, useState } from "react";
import { Modal } from "bootstrap";
import Pagination from "../components/pagination";
import RemoveProductModal from "../components/RemoveProductModal";
import ProductModal from "../components/ProductModal";

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};
function ProductPage({
  getProducts,
  setIsAuth,
  pageInfo,
  setPageInfo,
  products,
  setProducts,
}) {
  //建立開啟狀態
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);

  //建立modal狀態
  const [modalMode, setModalMode] = useState(null);

  //初始化建立tempProduct
  const [tempProduct, setTempProduct] = useState(defaultModalState);

  //打開刪除產品
  const handleOpenProductDelModal = (product) => {
    setTempProduct(product);
    // const modalDelInstance = Modal.getInstance(productDelModalRef.current);
    // modalDelInstance.show();
    setIsDelProductModalOpen(true);
  };

  //判斷打開是編輯或是新建產品
  const handleOpenProductModal = (mode, product) => {
    setModalMode(mode);
    switch (mode) {
      case "create":
        setTempProduct(defaultModalState);
        break;

      case "edit":
        setTempProduct(product);
        break;
    }

    setIsProductModalOpen(true);
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h2>產品列表</h2>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleOpenProductModal("create");
                }}
              >
                新增產品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">查看細節</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled === 1 ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span className="text-danger">未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            handleOpenProductModal("edit", product);
                          }}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            handleOpenProductDelModal(product);
                          }}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination getProducts={getProducts} pageInfo={pageInfo} />
      </div>
      {/* 新增Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
        modalMode={modalMode}
        tempProduct={tempProduct}
        getProducts={getProducts}
      />
      {/* 刪除modal */}
      <RemoveProductModal
        isOpen={isDelProductModalOpen}
        setIsOpen={setIsDelProductModalOpen}
        tempProduct={tempProduct}
        getProducts={getProducts}
      />
    </>
  );
}
export default ProductPage;
