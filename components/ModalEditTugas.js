import { notification } from "antd";
import axios from "axios";
import moment from "moment/moment";
import React from "react";

const ModalEditTugas = ({ getData, editData }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formEntries = Object.fromEntries(formData);

    const { data } = await axios
      .put(`http://localhost:3333/tugas/${editData.id}`, formEntries, {
        headers: {
          // Template Literal
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      });

    if (data) {
      getData();
      notification.success({
        message: data.message,
        description: "Berhasil",
      });
    }
  };

  const formatDeadline = (deadline) => {
    return moment(deadline).format("YYYY-MM-DD");
  };

  return (
    <div
      class="modal fade"
      id="editTugas"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Edit Tugas
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="modal-body">
              <div class="mb-3">
                <label for="deadline" class="form-label">
                  Pilih Tanggal Deadline
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="deadline"
                  name="deadline"
                  defaultValue={formatDeadline(editData.deadline)}
                />
              </div>
              <div class="mb-3">
                <label for="deskripsi" class="form-label">
                  Deskripsi
                </label>
                <textarea
                  class="form-control"
                  id="deskripsi"
                  name="deskripsi"
                  rows="3"
                  defaultValue={editData.deskripsi}
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEditTugas;
