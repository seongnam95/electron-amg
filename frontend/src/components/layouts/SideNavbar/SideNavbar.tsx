import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { breadcrumbStore } from '~/stores/breadcrumb';

import { SideNavbarStyled } from './styled';

const SideNavbar = () => {
  const breadcrumb = useRecoilValue(breadcrumbStore);
  const menus = breadcrumb.filter(crumb => crumb.menu);

  return (
    <SideNavbarStyled className="SideNavbar">
      <LayoutGroup>
        <div className="items">
          <AnimatePresence>
            {menus.map(menu => {
              const isActive = true;
              console.log(menu.key);
              return (
                <motion.div
                  key={menu.key}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <Link
                    key={menu.key}
                    to={menu.path}
                    className={clsx('item', isActive && 'active')}
                  >
                    {isActive && (
                      <motion.div
                        className="menuActiveBG"
                        layoutId="menuActiveBG"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    {menu.icon}
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </SideNavbarStyled>
  );
};

export default SideNavbar;
