// Получаем элементы формы из DOM
const carMake = document.querySelector("#car-make");
const carModel = document.querySelector("#car-model");
const additionalOptions = document.querySelector("#additional-options");
const bookingForm = document.querySelector("#booking-form");

// Список доступных марок автомобилей
const listMakes = [
  { label: "Toyota", value: "toyota" },
  { label: "Honda", value: "honda" },
  { label: "Ford", value: "ford" },
  { label: "BMW", value: "bmw" },
  { label: "Mercedes", value: "mercedes" },
];

// Список моделей автомобилей, зависящий от выбранной марки
const listModels = {
  toyota: [
    { label: "Camry", value: "camry" },
    { label: "Corolla", value: "corolla" },
    { label: "RAV4", value: "rav4" },
  ],
  honda: [
    { label: "Civic", value: "civic" },
    { label: "Accord", value: "accord" },
    { label: "CR-V", value: "crv" },
  ],
  ford: [
    { label: "Fiesta", value: "fiesta" },
    { label: "Focus", value: "focus" },
    { label: "Mustang", value: "mustang" },
  ],
  bmw: [
    { label: "3 Series", value: "3series" },
    { label: "X5", value: "x5" },
    { label: "Z4", value: "z4" },
  ],
  mercedes: [
    { label: "C-Class", value: "cclass" },
    { label: "E-Class", value: "eclass" },
    { label: "GLE", value: "gle" },
  ],
};

// Инициализация Virtual Select для выбора марки автомобиля
VirtualSelect.init({
  ele: "#car-make",
  options: listMakes,
  placeholder: "Выберите марку автомобиля",
});

// Инициализация Virtual Select для выбора модели автомобиля (пока что пустой)
VirtualSelect.init({
  ele: "#car-model",
  options: [],
  placeholder: "Выберите модель автомобиля",
});

// Обработка изменения выбора марки автомобиля
carMake.addEventListener("change", function () {
  const modelOptions = listModels[this.value] || []; // Получаем список моделей для выбранной марки

  // Обновляем доступные модели в зависимости от выбранной марки
  if (modelOptions.length) {
    carModel.setOptions(modelOptions);
  } else {
    carModel.reset();
    carModel.setOptions([]);
  }
});

// Инициализация Virtual Select для выбора дополнительных опций
const listOptions = [
  { label: "Кондиционер", value: "ac" },
  { label: "Навигация", value: "gps" },
  { label: "Автоматическая коробка передач", value: "auto" },
  { label: "Детское кресло", value: "child_seat" },
  { label: "Багажник для лыж", value: "ski_rack" },
];

VirtualSelect.init({
  ele: "#additional-options",
  options: listOptions,
  multiple: true,
  placeholder: "Выберите дополнительные опции",
});

// Обработка отправки формы бронирования
bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Получаем выбранные значения из каждого поля
  const selectedMake = carMake.getSelectedOptions();
  const selectedModel = carModel.getSelectedOptions();
  const selectedOptions = additionalOptions.getSelectedOptions();

  // Форматируем выбранные значения для вывода
  const makeLabel = selectedMake.label || "Не выбрана марка";
  const modelLabel = selectedModel.label || "Не выбрана модель";
  const optionsLabels = selectedOptions.length
    ? selectedOptions.map((option) => option.label).join(", ")
    : "Нет дополнительных опций";

  // Выводим информацию в консоль
  console.log(`Марка автомобиля: ${makeLabel}`);
  console.log(`Модель автомобиля: ${modelLabel}`);
  console.log(`Дополнительные опции: ${optionsLabels}`);
});
