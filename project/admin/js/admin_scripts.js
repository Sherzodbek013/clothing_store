document.addEventListener('DOMContentLoaded', () => {
    // Fetch orders
    fetch('/orders')
        .then(response => response.json())
        .then(data => {
            const orderList = document.getElementById('order-list');
            data.forEach(order => {
                const orderRow = document.createElement('tr');
                orderRow.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.user_id}</td>
                    <td>${order.product_id}</td>
                    <td>${order.quantity}</td>
                    <td>${order.status}</td>
                    <td>
                        <select class="form-control" data-order-id="${order.id}">
                            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </td>
                `;
                orderList.appendChild(orderRow);

                // Add event listener to update order status
                const statusSelect = orderRow.querySelector('select');
                statusSelect.addEventListener('change', () => {
                    const orderId = statusSelect.getAttribute('data-order-id');
                    const status = statusSelect.value;
                    fetch(`/orders/${orderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message);
                    })
                    .catch(error => {
                        console.error('Error updating order status:', error);
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });

    // Fetch products
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.forEach(product => {
                const productRow = document.createElement('tr');
                productRow.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.stock}</td>
                `;
                productList.appendChild(productRow);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    // Fetch users
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            data.forEach(user => {
                const userRow = document.createElement('tr');
                userRow.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.address}</td>
                    <td>${user.phone}</td>
                `;
                userList.appendChild(userRow);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
});
