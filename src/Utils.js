import React from 'react'


    export const createHtmlTree = (items) => {
        return <ul>
        {items.map(item => <li key={item.Id}><img className="thumb" src={item.Picture.ImageUrl} alt={item.Picture.SeoFilename}/> {item.Name}
            {item.children && item.children.length > 0 && createHtmlTree(item.children)}
            </li>)}
        </ul>;
    }


    export const createObjectTree = (data) =>  {
        const items = data.map(item => Object.assign({}, item, { children: [] }));
        const mapById = new Map(items.map(item => [item.Id, item]));
        const topLevel = [];

        for (const item of items) {
            // Check if there is parent item
            const parent = mapById.get(item.ParentCategoryId);

            if (parent) {
                // Append the item into the parent's children array
                parent.children.push(item);
            } else {
                // The item has no parent
                topLevel.push(item);
            }
        }
        return topLevel;
    }


    export const filterNestedObject = (data, searchTerm) => {
        const filterObject = data.filter(d => {
            if (d.children) {
                d.children = filterNestedObject(d.children, searchTerm);
            }
            return (d.ParentCategoryId === 0 || d.Name.toString().toLowerCase().search(searchTerm.toString().toLowerCase()) !== -1 || d.children.length > 0)
        })
        return filterObject;
    }