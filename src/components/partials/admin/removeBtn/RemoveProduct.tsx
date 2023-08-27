

export default function RemoveBtn({ id } : { id: string }) {
  const removeTopic = async () => {
    const confirmed = confirm("Впевнені що хочете видалити цей товар?");

    if (confirmed) {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      }
    }
  };

  return (
    <button onClick={removeTopic} className="post-form__buttons-delete">
      Видалити
    </button>
  );
}

