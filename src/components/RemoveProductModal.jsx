import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;

function RemoveProductModal({ tempProduct, getProducts, isOpen, setIsOpen }) {
  useEffect(() => {
    new Modal(productDelModalRef.current, {
      backdrop: false,
    });
  }, []);

  //  建立刪除ref
  const productDelModalRef = useRef(null);

  //觸發刪除產品
  const handleDeleteProduct = async () => {
    await deleteProduct();
    getProducts();
    handleCloseProductDelModal();
  };

  //開啟產品
  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(productDelModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  //刪除產品api
  const deleteProduct = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`
      );
    } catch (error) {
      alert(error, "刪除產品失敗");
    }
  };
  //關閉刪除產品
  const handleCloseProductDelModal = () => {
    const modalInstance = Modal.getInstance(productDelModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  return (
    <div
      ref={productDelModalRef}
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseProductDelModal}
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseProductDelModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteProduct}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RemoveProductModal;
