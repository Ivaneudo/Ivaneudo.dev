import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideUpFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FloatingDevButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(201, 0, 0, 0.35);
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  right: 24px;
  bottom: 84px;
  z-index: 90;
  max-width: min(380px, calc(100vw - 32px));
  padding: 14px 16px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(16, 185, 129, 0.4);
  box-shadow: ${({ theme }) => theme.colors.shadowHover};
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${slideUpFade} 0.25s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 16px;
    bottom: 80px;
  }
`;

export const ToastIconBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(16, 185, 129, 0.15);
  color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ToastMessage = styled.p`
  font-family: ${({ theme }) => theme.fonts.arial};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const ToastCloseButton = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.codeBg};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  background-color: rgba(0, 0, 0, 0.68);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ModalDialog = styled.div`
  width: 100%;
  max-width: 980px;
  max-height: 90vh;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 18px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DevBadge = styled.span`
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.codeBg};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SectorTabsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 24px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
`;

export const SectorTabButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 13px;
  font-weight: 700;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) => (active ? '#FFFFFF' : theme.colors.textMuted)};
  border: 1px solid
    ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.surfaceBorder)};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ active, theme }) => (active ? '#FFFFFF' : theme.colors.text)};
  }
`;

export const ModalBody = styled.form`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const FieldGroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const LangGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const LangCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LangCardHeader = styled.div`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.arial};
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.arial};
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 92px;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.arial};
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ImageUploadBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.surfaceBorder};
`;

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.codeBg};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const PreviewThumb = styled.img`
  width: 128px;
  height: 72px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
`;

export const StacksPickerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StackChip = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 9px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primaryGlow : theme.colors.surface};
  border: 1px solid
    ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.surfaceBorder)};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 12px;
  font-weight: 600;

  img {
    width: 18px;
    height: 18px;
  }
`;

export const CustomStackRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`;

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

export const ErrorBanner = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  background-color: rgba(201, 0, 0, 0.14);
  color: #ef4444;
  border: 1px solid rgba(201, 0, 0, 0.35);
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 8px;
`;

export const ModalFooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;

export const PrimarySubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 14px;
  font-weight: 700;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DeleteConfirmBox = styled.div`
  padding: 16px;
  border-radius: 12px;
  background-color: rgba(201, 0, 0, 0.08);
  border: 1px solid rgba(201, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DeleteConfirmText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DeleteConfirmActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const DangerOutlineButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 16px;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid rgba(201, 0, 0, 0.45);
  color: #ef4444;
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 13px;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: rgba(201, 0, 0, 0.12);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DangerSolidButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  background-color: #dc2626;
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 13px;
  font-weight: 700;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #b91c1c;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.jetbrains};
  font-size: 13px;
  font-weight: 600;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }
`;
