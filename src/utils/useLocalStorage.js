import { useEffect, useState } from 'react';

function useLocalStorage(permissionVal) {
  const [state, setState] = useState(() => {
    const locatStorageValue = JSON.parse(
      window.localStorage.getItem('audetails')
    );
    if (locatStorageValue?.permissions?.length > 0) {
      const permission = locatStorageValue?.permissions
        ?.filter(
          (val) => val?.module?.toLowerCase() === permissionVal.toLowerCase()
        )
        .map((val) => val.type.toLowerCase());
      const isEditable = permission?.includes('edit');
      const isDeletable = permission?.includes('delete');
      const isCreateable = permission?.includes('create');
      const isViewable = permission?.includes('view');
      return [isCreateable, isViewable, isEditable, isDeletable];
    }
    return [];
  });

  useEffect(() => {
    setState(state);
  }, [state]);

  return [...state];
}

export default useLocalStorage;
