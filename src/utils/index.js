import { toast } from "sonner";

const getInitialData = () => ([
    {
      id: 1,
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 2,
      title: "Functional Component",
      body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 3,
      title: "Modularization",
      body: "Dalam konteks pemrograman JavaScript, modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 4,
      title: "Lifecycle",
      body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya. ",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 5,
      title: "ESM",
      body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
    {
      id: 6,
      title: "Module Bundler",
      body: "Dalam konteks pemrograman JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
      createdAt: '2022-04-14T04:27:34.572Z',
      archived: false,
    },
  ]);
  
  const showFormattedDate = (date) => {
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true // Use 12-hour format
    };

    const formattedDate = new Date(date).toLocaleDateString("en-US", dateOptions);
    const formattedTime = new Date(date).toLocaleTimeString("en-US", timeOptions);

    return `${formattedDate} at ${formattedTime}`; // Combine date and time
  }


  const copyToClipboard = (htmlText) => {
    // Create a temporary element to hold the HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlText; // Set the inner HTML to the provided text

    // Extract the plain text from the temporary element
    const plainText = tempElement.innerText || tempElement.textContent;

    // Copy the plain text to the clipboard
    navigator.clipboard.writeText(plainText).then(
      () => {
        toast("Copied");
      },
      (err) => {
        toast("Failed to copy");
        console.error("Failed to copy: ", err);
      }
    );
  };
  
  export { getInitialData, showFormattedDate, copyToClipboard };
  