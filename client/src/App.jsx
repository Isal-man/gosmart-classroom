import { useState } from "react";
import { createContext } from "react";
import { Header, Sidebar } from "./components";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const SidebarContext = createContext();
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

export const translate = {
  id: {
    teach: "Mengajar",
    enroll: "Terdaftar",
    cnf: "Kursus Tidak Ditemukan, temukan dengan mendapatkan kode kursus atau tautan kursus atau buat kursus Anda sendiri",
    customize: "Sesuaikan",
    sc: "Bagikan kelas",
    cr: "Buat",
    mt: "Materi",
    task: "Tugas",
    anc: "Pengumuman",
    tcr: "Pengajar",
    std: "Pelajar",
    cl: "Link Kursus",
    bl: "Di bawah ini adalah tautan untuk dibagikan kepada orang lain:",
    cc: "Kode kursus",
    scc: "Bagikan kode ini kepada orang lain untuk mengikuti kursus:",
    pm: "Post materi",
    pt: "Post tugas",
    pa: "Post pengumuman",
    att: "Lampiran",
    anf: "Belum ada lampiran",
    sf: "Ukuran maksimal 100MB",
    it: "Pastikan terlebih dahulu informasi yang akan diberikan ke siswa sudah sesuai.",
    ps: "Posting",
    jc: "Gabung kursus",
    jargon: "Gosmart Classroom adalah aplikasi pintar yang efisien dan berguna untuk pembelajaran di mana saja. Memberikan pengalaman interaktif dengan alat canggih untuk belajar tanpa batasan tempat.",
    ul: "Anda login sebagai:",
    jas: "Anda bergabung sebagai peserta",
    jtc: "Gabung ke kursus",
    email: "Email",
    fe: "Masukan email dengan format yang sesuai",
    fullName: "Nama lengkap",
    fn: "Nama harus memiliki setidaknya 3 karakter, dan maksimal 50 karakter",
    phoneNumber: "Nomor handphone",
    fpn: "Awali nomor telepon dengan +62 dengan minimal 12 karakter dan maksimal 14 karakter",
    upld: "Mengupload...",
    svng: "Menyimpan...",
    pst: "Memposting",
    tl: "list tugas",
    ac: "Arsipkan kelas",
    crc: "Buat kursus",
    ic: "Masukkan kode yang Anda dapat di sini.",
    join: "Gabung",
    fjc: "Untuk join menggunakan kode kursus",
    uav: "Gunakan akun yang sudah terverifikasi",
    uck: "Gunakan kode kursus yang terdiri dari 9 karakter kombinasi huruf dan angka, tanpa spasi ataupun simbol",
    pnu: "Gambar belum diupload",
    cd: "Data kursus",
    ot: "Anda otomatis menjadi guru",
    hm: "Beranda",
    clr: "Kalender",
    tch: "Teach",
    rg: "Terdaftar",
  }
}

export const App = () => {
  // hooks
  const [sidebarStyle, setSidebarStyle] = useState("");
  const [block, setBlock] = useState("hidden");
  const [token, setToken] = useState();
  const url = useLocation();

  // variable
  const path = url.pathname.includes("login") || url.pathname.includes("register") || url.pathname.includes("forgot-password") || url.pathname.includes("join-course") || url.pathname.includes("oauth")

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <SidebarContext.Provider
        value={{
          sidebarStyle,
          setSidebarStyle,
          block,
          setBlock,
        }}
      >
        {!path ? (
          <>
            <Header />
            <Sidebar />
            <main className="flex flex-col justify-center p-2 w-full h-full">
              <Outlet />
              {/* <ClassPage /> */}
            </main>
          </>
        ) : (
          <Outlet />
        )}
      </SidebarContext.Provider>
    </AuthContext.Provider>
  );
};
