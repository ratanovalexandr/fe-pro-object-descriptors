/**
 * Принимает в себя два аргумента, один из них принимает объект, второй строку с названием
 * дескриптора. Должно вернуть массив строк, которыми являются ключи объекта соответствующие
 * дескриптору. То есть если у нас есть два свойства у которых writable true(если мы передали арг
 * writable) то возвращает массив со строками-названиями этих свойств. Смотрите пример в check.js
 * @param {Object} object
 * @param {'writable' | 'enumerable' | 'configurable'} descriptor
 *
 * @returns string[]
 */
export const getKeysByDescriptor = (object, descriptor) => {
  const descriptors = Object.getOwnPropertyDescriptors(object);
  return Object.entries(descriptors)
    .filter(([, value]) => {
      return value[descriptor];
    })
    .map(([key]) => key);
};

/**
 * Должен вернуть true если объект был заморожен каким-либо методом заморозки freeze, seal, preventExtensions иначе false
 * @param {Object} object
 * @returns {boolean}
 */
export const isObjectAnyFrozen = (object) => {
  return Object.isFrozen(object);
};

/**
 * Принимает объект и строку. Мы должны вернуть НОВЫЙ объект(копию оригинального), в котором
 * название свойства (мы передали вторым аргументом), будет поставлено во writable false(только
 * нельзя перезаписывать, все остальное можно). Если свойство было в объекте, то мы ставим его значение
 * если не было ставим в значение null
 * @param {Object} object
 * @param {string} propertyName
 *
 * @returns {Object}
 */
export const assignLockedValues = (object, propertyName) => {
  const copiedObject = { ...object };

  if (propertyName in copiedObject) {
    Object.defineProperty(copiedObject, propertyName, {
      value: copiedObject[propertyName],
      writable: false,
    });
  } else {
    Object.defineProperty(copiedObject, propertyName, {
      value: null,
      enumerable: true,
      configurable: true,
    });
  }
  return copiedObject;
};

/**
 * Принимает объект и возвращает его копию, только абсолютно замороженную
 * Нельзя удалять свойства, добавлять и редактировать
 * @param {Object} object
 * @returns {Object}
 */
export const freezeAllInObject = (object) => {
  const copieObject = { ...object };
  Object.freeze(copieObject);
  return copieObject;
};
