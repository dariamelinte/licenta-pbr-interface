import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CategoryTable from "@/components/common/Tables/CategoryTable";
import { VerticalMenu } from "@/components/common/VerticalMenu";
import Page from "@/layouts/Page";
import { deleteCategory, getCategories } from "@/services/api/category";
import { ERROR_MESSAGE } from "@/constants/messages";
import { CategoryApiType } from "@/types/common/api";
import { Loading } from "@/components/common";

const Index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryApiType[]>([]);

  const handleGetCategories = async () => {
    try {
      const { data } = await getCategories();
  
      if (!data.success) throw Error(data.error);

      setCategories(data.data);
      setLoading(false);
      toast.info(data.message);
    } catch (error: any) {
      toast.error(error || ERROR_MESSAGE.default);
    }
  };

  const handleDeleteCategories = async (id: string) => {
    try {
      const { data } = await deleteCategory(id);

      if (!data.success) throw Error(data.error);

      toast.info(data.message);
    } catch (error: any) {
      toast.error(error || ERROR_MESSAGE.default);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <Page>
      <div className="flex">
        <VerticalMenu module="admin" />
        {loading ? (
          <Loading size="large" />
        ) : (
          <CategoryTable
            categories={categories}
            onDeleteCategory={handleDeleteCategories}
          />
        )}
      </div>
    </Page>
  );
};

export default Index;
