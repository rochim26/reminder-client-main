import { notification } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const daftar = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formEntries = Object.fromEntries(formData);

    // destructuring object
    const { data } = await axios
      .post("http://localhost:3333/user/daftar", formEntries)
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      });

    if (data) {
      notification.success({
        message: "Akun berhasil dibuat",
        description: "Jangan lupa password yang sudah diinput ya",
      });

      localStorage.setItem("token", data.token);

      router.push("/");
    }
  };

  return (
    <>
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">Daftar</h2>

                    <form onSubmit={handleSubmit}>
                      <div class="mb-3">
                        <label for="nama" class="form-label">
                          Nama
                        </label>
                        <input
                          name="nama"
                          type="text"
                          class="form-control"
                          id="nama"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          name="email"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          name="password"
                        />
                      </div>

                      <button
                        class="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Daftar
                      </button>
                    </form>
                  </div>

                  <div>
                    <p class="mb-0">
                      Sudah memiliki akun?{" "}
                      <Link href="/login">
                        <a class="text-white-50 fw-bold">
                          Silahkan login disini
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default daftar;
