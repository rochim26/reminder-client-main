import { Empty, notification, Spin } from "antd";
import axios from "axios";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ModalEditTugas from "../components/ModalEditTugas";
import ModalTambahTugas from "../components/ModalTambahTugas";
import Navbar from "../components/Navbar";

moment.locale("id");

const index = () => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});

  const getData = async () => {
    const { data } = await axios
      .get("http://localhost:3333/tugas", {
        headers: {
          // Template Literal
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        setLoading(false);
      });

    if (data) {
      setData(data);
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
  };

  const handleDelete = async (id) => {
    const { data } = await axios
      .delete(`http://localhost:3333/tugas/${id}`, {
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

  const checkUser = async () => {
    const { data } = await axios
      .get("http://localhost:3333/user/profil", {
        headers: {
          // Template Literal
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        router.push("/login");
      });

    if (data) {
      setNama(data.nama);
      getData();
    }
  };

  const formatDeadline = (deadline) => {
    return moment(deadline).fromNow();
  };

  // hooks => perintah dasar/ perintah default dari next.js / react.js
  useEffect(() => {
    // cek apakah user sudah login atau belum(?)
    checkUser();
  }, []);

  return (
    <>
      <Navbar nama={nama} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between">
          <h2>Daftar Tugas</h2>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#tambahTugas"
          >
            Tambah
          </button>
        </div>

        {data.length ? (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Deadline</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Opsi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, idx) => {
                return loading ? (
                  <Spin tip="Loading..."></Spin>
                ) : (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{formatDeadline(d.deadline)}</td>
                    <td>{d.deskripsi}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#editTugas"
                        onClick={() => handleEdit(d)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => handleDelete(d.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Empty />
        )}
      </div>

      <ModalTambahTugas getData={getData} />
      <ModalEditTugas editData={editData} getData={getData} />
    </>
  );
};

export default index;
