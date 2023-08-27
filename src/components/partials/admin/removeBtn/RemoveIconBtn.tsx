

export default function RemoveIconBtn({ id } : { id: string }) {
    const removeTopic = async () => {
      const confirmed = confirm("Впевнені що хочете видалити цю іконку?");
  
      if (confirmed) {
        const res = await fetch(`/api/icons?id=${id}`, {
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
  