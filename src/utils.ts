// Функция для извлечения идентификатора из URL
export const extractIdFromUrl = (url: string): number | null => {
    // Проверяем, что URL соответствует шаблону "https://swapi.dev/api/people/{id}/"
    const match = url.match(/\/(\d+)\/$/);
    if (match) {
      return parseInt(match[1], 10); // Извлекаем цифровую часть и преобразуем в число
    }
    return null; // Возвращаем null в случае, если URL не соответствует ожидаемому формату
  };
  
  // Пример использования
  /*const url = "https://swapi.dev/api/people/1/";
  const id = extractIdFromUrl(url);
  console.log(id); // Выведет: 1*/