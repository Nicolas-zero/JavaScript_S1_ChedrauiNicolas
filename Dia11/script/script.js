const apiUrl = 'https://yourproject.mockapi.io/api/v1/users'; // <-- Reemplaza con tu URL real de MockAPI

const form = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userList = document.getElementById('user-list');
const submitBtn = document.getElementById('submit-btn');

let editingId = null;

const fetchUsers = async () => {
  const res = await axios.get(apiUrl);
  userList.innerHTML = '';
  res.data.forEach(user => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>
        <strong>${user.name}</strong> - ${user.email}
      </div>
      <div>
        <button class="btn btn-sm btn-warning me-2" onclick="editUser('${user.id}', '${user.name}', '${user.email}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.id}')">Eliminar</button>
      </div>
    `;
    userList.appendChild(li);
  });
};

const addUser = async (user) => {
  await axios.post(apiUrl, user);
  fetchUsers();
};

const updateUser = async (id, user) => {
  await axios.put(`${apiUrl}/${id}`, user);
  fetchUsers();
};

const deleteUser = async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  fetchUsers();
};

window.editUser = (id, name, email) => {
  nameInput.value = name;
  emailInput.value = email;
  editingId = id;
  submitBtn.textContent = 'Actualizar';
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = {
    name: nameInput.value,
    email: emailInput.value
  };
  if (editingId) {
    await updateUser(editingId, user);
    editingId = null;
    submitBtn.textContent = 'Agregar';
  } else {
    await addUser(user);
  }
  form.reset();
});

// Inicializar
fetchUsers();