import { LoaderRef } from "../components/loader";

class DrawerManager {
  loaderRef: LoaderRef | null = null;

  registerLoader(ref: LoaderRef) {
    this.loaderRef = ref;
  }

  showLoader() {
    this.loaderRef?.showLoader();
  }

  hideLoader() {
    this.loaderRef?.hideLoader();
  }
}

export default new DrawerManager();
