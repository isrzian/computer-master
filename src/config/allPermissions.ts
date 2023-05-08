import auth from '../auth/infrastructure/permissions';

const allItems = [
    ...auth,
];

export function getAllPermissionsKeys() {
    const walk = (items) => {
        let keys = [];
        (items || []).forEach(item => {
            keys = keys.concat(item.id)
                .concat(walk(item.items));
        });
        return keys;
    };
    return walk(allItems);
}

export function getAllPermissionsTreeKeys() {
    return allItems;
}

export default allItems;
