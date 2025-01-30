import { imageUpload } from '@/apis/@common';
import { useMutation } from '@tanstack/react-query';

interface UseImageUploadParams {
  onSuccessHandler: (path: string) => void;
  onErrorHandler: () => void;
}

export const useImageUpload = ({
  onSuccessHandler,
  onErrorHandler,
}: UseImageUploadParams) => {
  return useMutation({
    mutationFn: imageUpload,
    onSuccess: (path) => onSuccessHandler(path),
    onError: onErrorHandler,
  });
};
